from django.db import models
from django.utils.text import slugify


class Property(models.Model):
    """A single property in the Mikaelson family's portfolio."""

    class PropertyType(models.TextChoices):
        MANOR = "manor", "Manor"
        ESTATE = "estate", "Estate"
        TOWNHOUSE = "townhouse", "Townhouse"
        COTTAGE = "cottage", "Cottage"
        LAND = "land", "Land"

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    property_type = models.CharField(
        max_length=20, choices=PropertyType.choices, default=PropertyType.ESTATE
    )
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    location = models.CharField(max_length=200, help_text="City / region, e.g. 'Braevale, Scotland'")
    bedrooms = models.PositiveIntegerField(default=0)
    bathrooms = models.PositiveIntegerField(default=0)
    area_sqft = models.PositiveIntegerField(default=0)
    year_established = models.PositiveIntegerField(
        null=True, blank=True, help_text="Year the property was originally built"
    )
    image = models.ImageField(upload_to="properties/", blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-is_featured", "-created_at"]
        verbose_name_plural = "properties"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            i = 1
            while Property.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                i += 1
                slug = f"{base_slug}-{i}"
            self.slug = slug
        super().save(*args, **kwargs)


class Inquiry(models.Model):
    """A message sent through the contact / 'request a viewing' form."""

    property = models.ForeignKey(
        Property, on_delete=models.SET_NULL, null=True, blank=True, related_name="inquiries"
    )
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "inquiries"

    def __str__(self):
        return f"{self.name} — {self.property or 'General enquiry'}"
