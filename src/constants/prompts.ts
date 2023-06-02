export const itinenaryPrompt = (dateRange: number, location: string, tripType: "Busy" | "Relaxed", tripDetails: "Cultural" | "Balanced" | "Adventure" | "Sightsee") => {
    return `Can you create a ${dateRange} day itinerary for ${location} with the following instructions:
    1. Time to go from one place to the next is the least
    2. List all places to see in the following manner in a numbered list per-day: <Place to visit : What to do there in less than 100 words (Time to spend in hours)>.  
    3. Also add "Must-see!" if a particular place is a must-see attraction.
    4. If the place is a hike, also add the elevation gain and length of the hike in a "Hike details: " line. Only include  hikes less than 4 miles long.
    5. Tell the town/city/area to stay at the end of each day in this format: City/Area to stay at: <Name of city/area>
    6. Make sure the city/area to stay at takes into consideration the logistics for things seen on that day and to be seen the next day.
    7. Add a 50-100 word overview section for each day, before starting to list the numbered points.
    8. Type of trip:${tripType} & ${tripDetails}
    `
}