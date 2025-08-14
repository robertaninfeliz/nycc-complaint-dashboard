from django.urls import path
from rest_framework import routers
from .views import ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet, DashboardViewSet, ConstituentComplaintsViewSet

router = routers.SimpleRouter()
router.register(r'allComplaints', ComplaintViewSet, basename='complaint')
router.register(r'openCases', OpenCasesViewSet, basename='openCases')
router.register(r'closedCases', ClosedCasesViewSet, basename='closedCases')
router.register(r'topComplaints', TopComplaintTypeViewSet, basename='topComplaints')
router.register(r'constituentComplaints', ConstituentComplaintsViewSet, basename='constituentComplaints')
urlpatterns = [
    path('dashboard/', DashboardViewSet.as_view({'get': 'list'}), name='dashboard')
]

urlpatterns += router.urls

