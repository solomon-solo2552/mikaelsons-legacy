from django.contrib import admin
from .models import Property, Inquiry


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ["title", "property_type", "status", "location", "price", "is_featured", "created_at"]
    list_filter = ["property_type", "status", "is_featured"]
    search_fields = ["title", "location", "description"]
    prepopulated_fields = {"slug": ("title",)}
    list_editable = ["status", "is_featured"]


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "property", "created_at"]
    readonly_fields = ["created_at"]
