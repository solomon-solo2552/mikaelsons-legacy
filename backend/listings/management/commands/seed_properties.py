from django.core.management.base import BaseCommand
from listings.models import Property


SAMPLE_PROPERTIES = [
    dict(
        title="Ravenswick Manor",
        property_type="manor",
        price=2450000,
        location="Braevale, Scotland",
        bedrooms=8,
        bathrooms=6,
        area_sqft=9800,
        year_established=1421,
        is_featured=True,
        description=(
            "The house the Mikaelson name began with. Fifteenth-century stonework, "
            "a restored great hall, and gardens that have outlived six generations."
        ),
    ),
    dict(
        title="Thornfield Estate",
        property_type="estate",
        price=3200000,
        location="Ashcombe Valley, England",
        bedrooms=10,
        bathrooms=7,
        area_sqft=12400,
        year_established=1587,
        is_featured=True,
        description=(
            "A working estate with its own chapel and orchard, sold once in four "
            "hundred years — and only because the last family asked us to find it a new one."
        ),
    ),
    dict(
        title="The Blackgate Townhouse",
        property_type="townhouse",
        price=980000,
        location="Old Quarter, York",
        bedrooms=4,
        bathrooms=3,
        area_sqft=3100,
        year_established=1732,
        is_featured=False,
        description="Wrought-iron balconies, original oak floors, a cellar older than the country's roads.",
    ),
    dict(
        title="Hollow Wick Cottage",
        property_type="cottage",
        price=410000,
        location="Fenmoor",
        bedrooms=2,
        bathrooms=1,
        area_sqft=1450,
        year_established=1690,
        is_featured=False,
        description="Small enough to heat with one fire, old enough to have its own ghost stories.",
    ),
    dict(
        title="Greywatch Land Parcel",
        property_type="land",
        price=650000,
        location="North Ridge",
        bedrooms=0,
        bathrooms=0,
        area_sqft=217800,
        year_established=None,
        is_featured=False,
        description="Forty acres bordering the old family land. Zoned for a single estate residence.",
    ),
    dict(
        title="Duskmoor Estate",
        property_type="estate",
        price=1875000,
        location="Corvane Hills",
        bedrooms=6,
        bathrooms=5,
        area_sqft=7600,
        year_established=1508,
        is_featured=True,
        description="Set behind a mile of yew hedge, with a lake that freezes just enough to skate on.",
    ),
]


class Command(BaseCommand):
    help = "Seeds the database with sample Mikaelson's Legacy properties (no images)."

    def handle(self, *args, **options):
        created = 0
        for data in SAMPLE_PROPERTIES:
            _, was_created = Property.objects.get_or_create(
                title=data["title"], defaults=data
            )
            if was_created:
                created += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Done. Created {created} new properties "
                f"({Property.objects.count()} total in the database)."
            )
        )
        self.stdout.write(
            "These have no photos yet — add some from /admin/ or leave them, "
            "the frontend shows a placeholder automatically."
        )
