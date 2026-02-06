export const BlueSphereWaypoints = [
    {
        //initial stage
        percent: 0.1,
        outerAlpha: 0,
        innerAlpha: 0,
        lightIntensity: 0,
        modelAlpha: 0
    },
    {
        //show core/light
        percent: 0.2,
        outerAlpha: 0.6,
        innerAlpha: 1,
        lightIntensity: 10,
        modelAlpha: 1
    },
    {
        //fade out with zoom
        percent: 0.35,
        outerAlpha: 0.1,
        innerAlpha: 0.2,
        lightIntensity: 1,
        modelAlpha: 0.2
    },
    {
        percent: 0.5,
        outerAlpha: 0,
        innerAlpha: 0,
        lightIntensity: 0,
        modelAlpha: 0
    },
    {
        //show core/light
        percent: 0.6,
        outerAlpha: 0.6,
        innerAlpha: 1,
        lightIntensity: 10,
        modelAlpha: 1
    },
    {
        //show everything
        percent: 0.8,
        outerAlpha: 0.6,
        innerAlpha: 1,
        lightIntensity: 10,
        modelAlpha: 1
    },
    {
        percent: 1,
        outerAlpha: 0.6,
        innerAlpha: 1,
        lightIntensity: 10,
        modelAlpha: 1
    }
]

export const PurpleSphereWaypoints = [
    {
        //initial stage
        percent: 0.0,
        outerAlpha: 0,
        innerAlpha: 0,
        lightIntensity: 0,
        modelAlpha: 0
    },
    {
        //show icosphere
        percent: 0.2,
        outerAlpha: 0,
        innerAlpha: 0,
        lightIntensity: 0,
        modelAlpha: 0
    },
    {
        //show core/light
        percent: 0.3,
        outerAlpha: 0.6,
        innerAlpha: 1,
        lightIntensity: 10,
        modelAlpha: 1
    },
    {
        //fade out with zoom
        percent: 0.5,
        outerAlpha: 0,
        innerAlpha: 0,
        lightIntensity: 0,
        modelAlpha: 0
    },
    {
        percent: 0.6,
        outerAlpha: 0.6,
        innerAlpha: 1,
        lightIntensity: 10,
        modelAlpha: 1
    },
    {
        //show everything
        percent: 0.8,
        outerAlpha: 0.6,
        innerAlpha: 1,
        lightIntensity: 10,
        modelAlpha: 1
    },
    {
        percent: 1,
        outerAlpha: 0.6,
        innerAlpha: 1,
        lightIntensity: 10,
        modelAlpha: 1
    }
]

export const GreenSphereWaypoints = [
    {
        //initial stage
        percent: 0.0,
        outerAlpha: 0,
        innerAlpha: 0,
        lightIntensity: 0,
        modelAlpha: 0
    },
    {
        //show icosphere
        percent: 0.3,
        outerAlpha: 0,
        innerAlpha: 0,
        lightIntensity: 0,
        modelAlpha: 0
    },
    {
        //show core/light
        percent: 0.4,
        outerAlpha: 0.6,
        innerAlpha: 1,
        lightIntensity: 10,
        modelAlpha: 1
    },
    {
        //fade out with zoom
        percent: 0.5,
        outerAlpha: 0,
        innerAlpha: 0,
        lightIntensity: 0,
        modelAlpha: 0
    },
    {
        percent: 0.6,
        outerAlpha: 0.6,
        innerAlpha: 1,
        lightIntensity: 10,
        modelAlpha: 1
    },
    {
        percent: 0.8,
        outerAlpha: 0.6,
        innerAlpha: 1,
        lightIntensity: 10,
        modelAlpha: 1
    },
    {
        percent: 1,
        outerAlpha: 0.6,
        innerAlpha: 1,
        lightIntensity: 10,
        modelAlpha: 1
    }
]

export const CameraWaypoints = [
    {
        percent: 0,
        z_pos: -10,
        y_pos: 0,
        x_pos: 0,
        y_rot: 0
    },
    {
        percent: 0.1,
        z_pos: -5,
        y_pos: 0,
        x_pos: 0,
        y_rot: 0
    },
    {
        percent: 0.2,
        z_pos: 5,
        y_pos: 0,
        x_pos: 0,
        y_rot: 0
    },
    {
        percent: 0.3,
        z_pos: 10,
        y_pos: 2,
        x_pos: 0,
        y_rot: 0
    },
    {
        percent: 0.4,
        z_pos: 15,
        y_pos: 0,
        x_pos: 0,
        y_rot: 0
    },
    {
        percent: 0.5,
        z_pos: 5,
        y_pos: -0.5,
        x_pos: 8,
        y_rot: 90
    },
    {
        percent: 0.7,
        z_pos: 5,
        y_pos: -0.5,
        x_pos: 8,
        y_rot: 90
    },
    {
        percent: 1,
        z_pos: 5,
        y_pos: -0.5,
        x_pos: 8,
        y_rot: 90
    }
]

export const BustWaypoints = [
    {
        percent: 0.0,
        opacity: 0
    },
    {
        percent: 0.4,
        opacity: 0
    },
    {
        percent: 0.5,
        opacity: 1
    },
    {
        percent: 1.0,
        opacity: 1
    }
]

export const WelcomeBustWaypoints = [
    {
        percent: 0.0,
        opacity: 0
    },
    {
        percent: 0.1,
        opacity: 1
    },
    {
        percent: 0.2,
        opacity: 0
    },
    {
        percent: 1.0,
        opacity: 0
    }
]

export const TubeWaypoints = [
    {
        percent: 0.0,
        innerOpacity: 0.0,
        outerOpacity: 0.0
    },
    {
        percent: 0.5,
        innerOpacity: 0.0,
        outerOpacity: 0.0
    },
    {
        percent: 0.6,
        innerOpacity: 1.0,
        outerOpacity: 0.6
    },
    {
        percent: 1.0,
        innerOpacity: 1.0,
        outerOpacity: 0.6
    }
]