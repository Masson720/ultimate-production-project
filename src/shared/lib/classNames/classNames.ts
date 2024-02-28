

//Record определяет тип ключа и значения
type ModsType = Record<string, boolean | string>


export function classNames (className: string, mods: ModsType = {}, additional: string[] = []): string {
    return [
        className,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
        .filter(([cls, value]) => Boolean(value))
        .map(([cls]) => cls)
    ]
    .join(' ')
}