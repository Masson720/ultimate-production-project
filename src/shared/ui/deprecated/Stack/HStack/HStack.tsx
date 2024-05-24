import { Flex, FlexProps } from "../Flex/Flex";

type HStackProps = Omit<FlexProps, 'direction'>

/**
 * Устарел, используйте новые компоненты из папки redesigned
 * @deprecated
 */

export const HStack = (props: HStackProps) => {
    return (
        <Flex {...props} direction="row"/>
    )
}