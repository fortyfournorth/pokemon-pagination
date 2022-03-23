export const POKEMON_STAT_COLORS = (stat: number): string => {
    if (stat <= 30) {
        return "#F34444"
    } else if (stat <= 59) {
        return "#FF7F0F"
    } else if (stat <= 89) {
        return "#FFDD57"
    } else if (stat <= 119) {
        return "#A0E515"
    } else if (stat <= 149) {
        return "#23CD5E"
    } else if (stat <= 180) {
        return "#00C2B8"
    } else {
        return "#FFFFFF"
    }
}