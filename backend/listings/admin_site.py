"""
Customize the Django admin to feel like part of Mikaelson's Legacy,
rather than a default Django install.
"""

from django.contrib.admin import AdminSite
from django.utils.translation import gettext_lazy as _


class MikaelsonAdminSite(AdminSite):
    site_header = _("Mikaelson's Legacy")
    site_title = _("Estate Operations")
    index_title = _("The Estate Office — Operations Desk")

    def each_context(self, request):
        context = super().each_context(request)

        # Lazy import to avoid circular dependency at module load time
        from .models import Property, Inquiry

        context["m_estate_stats"] = {
            "properties": Property.objects.count(),
            "featured": Property.objects.filter(is_featured=True).count(),
            "inquiries": Inquiry.objects.count(),
        }
        return context


mikaelson_admin_site = MikaelsonAdminSite(name="mikaelson_admin")