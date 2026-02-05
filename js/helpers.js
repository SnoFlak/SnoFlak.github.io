export function mapRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}