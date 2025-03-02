export interface WalkthroughStep {
  id: string
  title: string
  description: string
  image?: string
}

export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]
  walkthrough: {
    enabled: boolean
    steps: WalkthroughStep[]
  }
}

export type PersistNavigationConfig = ConfigBaseProps["persistNavigation"]

const BaseConfig: ConfigBaseProps = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  persistNavigation: "dev",

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: "always",

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ["Welcome"],

  walkthrough: {
    enabled: true,
    steps: [
      {
        id: "morning",
        title: "Morning Routine",
        description:
          "Start your day right with personalized morning notifications to keep you on track.",
        image: require("../../assets/images/walkthrough/walkthrough_morning.png"),
      },
      {
        id: "tracking",
        title: "Track Your Progress",
        description: "Monitor your daily activities, workouts, and nutrition all in one place.",
        image: require("../../assets/images/walkthrough/walkthrough_tracker.png"),
      },
      {
        id: "achievements",
        title: "Celebrate Wins",
        description: "Earn achievements and track your journey with daily journal entries.",
        image: require("../../assets/images/walkthrough/walkthrough_achievement.png"),
      },
      {
        id: "recommendations",
        title: "Smart Recommendations",
        description: "Get personalized activity suggestions based on your progress and goals.",
        image: require("../../assets/images/walkthrough/walkthrough_recommendation.png"),
      },
    ],
  },
}

export default BaseConfig
