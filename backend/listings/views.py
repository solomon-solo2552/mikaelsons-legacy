from rest_framework import viewsets, generics
from .models import Property, Inquiry
from .serializers import PropertyListSerializer, PropertyDetailSerializer, InquirySerializer


class PropertyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoints for the public property listings.

    GET /api/properties/                -> list (supports ?type= and ?search=)
    GET /api/properties/<slug>/         -> single property detail
    """

    queryset = Property.objects.all()
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "retrieve":
            return PropertyDetailSerializer
        return PropertyListSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        property_type = self.request.query_params.get("type")
        if property_type:
            queryset = queryset.filter(property_type=property_type)

        search = self.request.query_params.get("search")
        if search:
            queryset = queryset.filter(title__icontains=search) | queryset.filter(
                location__icontains=search
            )

        return queryset


class InquiryCreateView(generics.CreateAPIView):
    """
    POST /api/inquiries/  -> submit the contact / "request a viewing" form.
    """

    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
