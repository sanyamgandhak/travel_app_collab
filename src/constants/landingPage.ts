import Svg1 from "@/assets/svg image.png";
import Svg3 from "@/assets/svg image-2.png";
import Svg2 from "@/assets/svg image-3.png";
import Cover from "@/assets/cover.png";
import People1 from "@/assets/people.jpg";
import People2 from "@/assets/nayeon.png";

export const landingPageData = {
    Cards: {
        Section1: {
            heading: "Effortless Trip Planning",
            description: `Get a personalized travel itinerary for your upcoming trip
        tailored to your preferences. Receive recommendations on places
        to visit, activities to do, where to stay, and more.`,
            imageUrl: Svg1
        },
        Section2: {
            heading: "Discover New Destinations",
            description: `Venture beyond the ordinary and embrace the thrill of discovery.
        Get personalized recommendations on travel destinations and
        activities that you might not have considered.`,
            imageUrl: Svg2
        },
        Section3: {
            heading: "Keep Plans in One Place",
            description: `Save your favorite itineraries and travel ideas in one place,
        making it easy to access and review them at any time.`,
            imageUrl: Svg3
        },
    },

    Cover: {
        title1: "Explore the world,",
        title2: "plan with Roam",
        description: `Instantly create the perfect itinerary for your trip, discover
        new destinations, and save your trip ideas all in one place.`,
        imageUrl: Cover
    },
    Testimonials: {
        Person1: {
            description: `"With Roam, I can save all my trip details in one place and
            access them from anywhere. It's made my travels so smooth
            and stress-free."`,
            imageUrl: People1,
            name: "Jane"
        },
        Person2: {
            description: `"I never realized how much time I was wasting trying to
            plan trips before I started using Roam. It's so easy and
            convenient!"`,
            imageUrl: People2,
            name: "Robert"
        },
        Person3: {
            description: `"The AI-powered features take the stress out of planning
            and ensure that I make the most of my time in every
            location."`,
            imageUrl: People1,
            name: "Katelynn"
        },


    }
}