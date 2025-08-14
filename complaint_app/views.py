from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from django.db.models import Q, Count

# Create your views here.


class ComplaintViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    serializer_class = ComplaintSerializer
    queryset = Complaint.objects.none()

    def get_queryset(self):
        user_district = self.request.user.userprofile.district.zfill(2)
        return Complaint.objects.filter(account__endswith=user_district).exclude(
            account__exact=""
        )


class OpenCasesViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    serializer_class = ComplaintSerializer
    queryset = Complaint.objects.none()

    def get_queryset(self):
        user_district = self.request.user.userprofile.district.zfill(2)
        base_queryset = Complaint.objects.filter(
            account__endswith=user_district
        ).exclude(account__exact="")
        return base_queryset.filter(
            Q(closedate__isnull=True) | ~Q(closedate__regex=r"^\d{4}-\d{2}-\d{2}")
        )


class ClosedCasesViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    serializer_class = ComplaintSerializer
    queryset = Complaint.objects.none()

    def get_queryset(self):
        user_district = self.request.user.userprofile.district.zfill(2)
        base_queryset = Complaint.objects.filter(
            account__endswith=user_district
        ).exclude(account__exact="")
        return base_queryset.filter(closedate__regex=r"^\d{4}-\d{2}-\d{2}")


class TopComplaintTypeViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    serializer_class = ComplaintSerializer
    queryset = Complaint.objects.none()

    def list(self, request):
        user_district = request.user.userprofile.district.zfill(2)
        top_complaints = (
            Complaint.objects.filter(account__endswith=user_district)
            .exclude(account__exact="")
            .values("complaint_type")
            .annotate(count=Count("complaint_type"))
            .order_by("-count")[:3]
        )
        return Response(top_complaints)


class DashboardViewSet(viewsets.ViewSet):
    def list(self, request):
        user_district = request.user.userprofile.district.zfill(2)
        base_qs = Complaint.objects.filter(account__endswith=user_district).exclude(
            account__exact=""
        )

        return Response(
            {
                "all": ComplaintSerializer(base_qs, many=True).data,
                "open": base_qs.filter(
                    Q(closedate__isnull=True)
                    | ~Q(closedate__regex=r"^\d{4}-\d{2}-\d{2}")
                ).count(),
                "closed": base_qs.filter(
                    closedate__regex=r"^\d{4}-\d{2}-\d{2}"
                ).count(),
                "top_complaints": base_qs.values("complaint_type")
                .annotate(count=Count("complaint_type"))
                .order_by("-count")[:3],
            }
        )

class ConstituentComplaintsViewSet(viewsets.ModelViewSet):
    """
    Returns complaints FROM constituents who LIVE IN
    the council member's district (council_dist filter)
    """

    http_method_names = ["get"] 
    serializer_class = ComplaintSerializer
    queryset = Complaint.objects.none()

    def get_queryset(self):
        # Get padded district (e.g., "3" → "03")
        user_district = self.request.user.userprofile.district.zfill(2)

        return Complaint.objects.filter(
            council_dist__endswith=user_district  # Filter by resident's district
        ).exclude(
            council_dist__exact=""
        )
