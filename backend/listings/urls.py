from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, InquiryCreateView

router = DefaultRouter()
router.register("properties", PropertyViewSet, basename="property")

urlpatterns = [
    path("", include(router.urls)),
    path("inquiries/", InquiryCreateView.as_view(), name="inquiry-create"),
]
