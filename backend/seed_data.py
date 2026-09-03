import asyncio

GUIDE_NOTES: list[dict] = [
    {
        "id": "destination:hunza",
        "title": "Hunza Valley",
        "url": "/destinations/hunza",
        "text": "Hunza Valley sits among the Karakoram mountains in Gilgit-Baltistan. Visitors often come for high passes, village walks, apricot orchards, and unhurried high-altitude days. Conditions and access can change seasonally.",
    },
    {
        "id": "destination:skardu",
        "title": "Skardu",
        "url": "/destinations/skardu",
        "text": "Skardu is known for granite valleys, alpine lakes, and wide skies in Gilgit-Baltistan. It is a useful base for outdoor-focused routes, but altitude, weather, and road conditions require current local checks.",
    },
    {
        "id": "destination:lahore",
        "title": "Lahore",
        "url": "/destinations/lahore",
        "text": "Lahore is a strong fit for heritage, food, courtyards, old-city walks, and creative city life in Punjab. Give the city time and verify opening hours and access locally.",
    },
    {
        "id": "destination:islamabad",
        "title": "Islamabad",
        "url": "/destinations/islamabad",
        "text": "Islamabad offers a gentle first landing, leafy avenues, galleries, and access to the Margalla Hills. It can pair well with a longer northbound route.",
    },
    {
        "id": "destination:swat",
        "title": "Swat Valley",
        "url": "/destinations/swat",
        "text": "Swat Valley is a green river corridor in Khyber Pakhtunkhwa with pine forests, old settlements, and a slower road-trip rhythm. Check current local travel guidance before setting out.",
    },
    {
        "id": "destination:karachi",
        "title": "Karachi",
        "url": "/destinations/karachi",
        "text": "Karachi combines sea air, layered food culture, arts, and urban history in Sindh. It is best approached through neighborhoods and local recommendations rather than a rushed checklist.",
    },
]


async def main() -> None:
    from services import bm25_service, qdrant_service

    await qdrant_service.ensure_collection()
    await qdrant_service.upsert_notes(GUIDE_NOTES)
    await bm25_service.refresh_index()
    print(f"Seeded {len(GUIDE_NOTES)} notes into Qdrant collection.")


if __name__ == "__main__":
    asyncio.run(main())
