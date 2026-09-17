from rest_framework import serializers
from .models import Property, Inquiry


class PropertyListSerializer(serializers.ModelSerializer):
    """Lighter serializer used for the property grid / search results."""

    class Meta:
        model = Property
        fields = [
            "id", "title", "slug", "property_type", "price", "location",
            "bedrooms", "bathrooms", "area_sqft", "image", "is_featured",
        ]


class PropertyDetailSerializer(serializers.ModelSerializer):
    """Full serializer used for a single property page."""

    class Meta:
        model = Property
        fields = "__all__"


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ["id", "property", "name", "email", "phone", "message", "created_at"]
        read_only_fields = ["id", "created_at"]
