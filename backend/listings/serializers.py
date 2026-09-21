from rest_framework import serializers
from .models import Property, Inquiry


class PropertyListSerializer(serializers.ModelSerializer):
    """Lighter serializer used for the property grid / search results."""

    class Meta:
        model = Property
        fields = [
            "id", "title", "slug", "property_type", "status", "price", "location",
            "bedrooms", "bathrooms", "area_sqft", "image", "is_featured",
        ]


class PropertyDetailSerializer(serializers.ModelSerializer):
    """Full serializer used for a single property page."""

    class Meta:
        model = Property
        fields = "__all__"


class InquirySerializer(serializers.ModelSerializer):
    # Write-only field: frontend sends the slug, backend looks up the PK.
    # Not stored directly - used to populate `property` on create.
    property_slug = serializers.SlugField(
        write_only=True, required=False, allow_blank=True
    )

    class Meta:
        model = Inquiry
        fields = ["id", "property", "property_slug", "name", "email", "phone", "message", "created_at"]
        read_only_fields = ["id", "property", "created_at"]

    def create(self, validated_data):
        slug = validated_data.pop("property_slug", None)
        if slug:
            try:
                validated_data["property"] = Property.objects.get(slug=slug)
            except Property.DoesNotExist:
                # slug was passed but doesn't match - just leave property as NULL
                pass
        return super().create(validated_data)
