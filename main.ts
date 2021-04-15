
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */


enum MovementType
{
    //% block="forward"
    MoveForward = 0,
    //% block="backward"
    MoveBackward = 1,
    //% block="left"
    TurnLeft = 2,
    //% block="right"
    TurnRight = 3,
    //% block="stop"
    Stop = 4
}

/**
 * Custom blocks
 */
//% weight=100 color=#AAAAAA icon=""
namespace Valley_L298N {
    /**
     * @param direction Forward, Backward, Left and Right.
     * @param power how much power to use on drive motors, from 0 to 100
     * @param duration (ms) of this action.  5000 = indefinate
     */
    //% power.shadow="speedPicker"
    //% duration.shadow="timePicker"
    //% block
    export function Move(
        requestedMovement: MovementType = MovementType.MoveForward, 
        power: number, 
        duration: number ): void 
    {
        //power is inverted
        let realPower = 1023 - (1023 / 100 * power);
        let noPower = 1023;

        let leftForward = AnalogPin.P4;
        let leftBackward = AnalogPin.P5;
        let rightForward = AnalogPin.P6;
        let rightBackward = AnalogPin.P7;

        // Add code here
        switch (requestedMovement)
        {
            case MovementType.MoveForward:
            {
                pins.analogWritePin(leftForward, realPower);
                pins.analogWritePin(leftBackward, noPower);
                pins.analogWritePin(rightForward, realPower);
                pins.analogWritePin(rightBackward, noPower);
                break;
            }
            case MovementType.MoveBackward:
            {
                pins.analogWritePin(leftForward, noPower);
                pins.analogWritePin(leftBackward, realPower);
                pins.analogWritePin(rightForward, noPower);
                pins.analogWritePin(rightBackward, realPower);
                break;
            }
            case MovementType.TurnLeft:
            {
                pins.analogWritePin(leftForward, noPower);
                pins.analogWritePin(leftBackward, realPower);
                pins.analogWritePin(rightForward, realPower);
                pins.analogWritePin(rightBackward, noPower);
                break;
            }
            case MovementType.TurnRight:
            {
                pins.analogWritePin(leftForward, realPower);
                pins.analogWritePin(leftBackward, noPower);
                pins.analogWritePin(rightForward, noPower);
                pins.analogWritePin(rightBackward, realPower);
                break;
            }
            case MovementType.Stop:
            {
                pins.analogWritePin(leftForward, noPower);
                pins.analogWritePin(leftBackward, noPower);
                pins.analogWritePin(rightForward, noPower);
                pins.analogWritePin(rightBackward, noPower);
                break;
            }
        }

        if (duration != 5000)
        {
            pause(duration);
               
            pins.analogWritePin(leftForward, noPower);
            pins.analogWritePin(leftBackward, noPower);
            pins.analogWritePin(rightForward, noPower);
            pins.analogWritePin(rightBackward, noPower);
        }
    }
}

