import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { $styles } from "@/theme"
import config from "@/config/config.base"
import { useAppTheme } from "@/utils/useAppTheme"

interface WalkthroughScreenProps extends AppStackScreenProps<"Walkthrough"> {}

export const WalkthroughScreen: FC<WalkthroughScreenProps> = observer(
  function WalkthroughScreen(props) {
    const { navigation } = props
    const { themed } = useAppTheme()
    const [currentStep, setCurrentStep] = useState(0)

    const walkthrough = config.walkthrough
    const isLastStep = currentStep === walkthrough.steps.length - 1

    function handleNext() {
      if (isLastStep) {
        navigation.navigate("Welcome")
      } else {
        setCurrentStep(currentStep + 1)
      }
    }

    function handleSkip() {
      navigation.navigate("Welcome")
    }

    const step = walkthrough.steps[currentStep]

    // Convert step.image to a valid ImageSourcePropType
    const imageSource = typeof step.image === "string" ? { uri: step.image } : step.image

    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={themed($container)}>
          <Image source={imageSource} style={$stepImage} resizeMode="contain" />

          <View style={themed($content)}>
            <Text preset="heading" text={step.title} style={themed($title)} />
            <Text text={step.description} style={themed($description)} />
          </View>

          <View style={themed($footer)}>
            <View style={themed($dots)}>
              {walkthrough.steps.map((_, index) => (
                <View
                  key={index}
                  style={[themed($dot), index === currentStep && themed($activeDot)]}
                />
              ))}
            </View>

            <View style={themed($buttons)}>
              <Button
                text="Skip"
                preset="secondary"
                onPress={handleSkip}
                style={themed($skipButton)}
              />
              <Button
                text={isLastStep ? "Get Started" : "Next"}
                preset="primary"
                onPress={handleNext}
              />
            </View>
          </View>
        </View>
      </Screen>
    )
  },
)

const $container: ViewStyle = {
  flex: 1,
  padding: 20,
}

const $stepImage: ImageStyle = {
  width: "100%",
  height: 300,
  marginVertical: 20,
}

const $content: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const $title: TextStyle = {
  textAlign: "center",
  marginBottom: 10,
}

const $description: TextStyle = {
  textAlign: "center",
  marginBottom: 20,
}

const $footer: ViewStyle = {
  marginTop: "auto",
}

const $dots: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  marginBottom: 20,
}

const $dot: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
  marginHorizontal: 4,
  backgroundColor: "#E0E0E0",
}

const $activeDot: ViewStyle = {
  backgroundColor: "#1E88E5",
}

const $buttons: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const $skipButton: ViewStyle = {
  marginRight: 10,
}
