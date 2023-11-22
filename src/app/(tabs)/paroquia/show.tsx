import {
    Center,
    VStack,
    View,
    Text
} from "@gluestack-ui/themed";

export default function ParoquiasScreen() {
    return (
        <View pt="$20">
            <Center h="$80" justifyContent="center">
                <VStack space="md" reversed={false}>
                    <Text>Paróquias</Text>
                </VStack>
            </Center>
        </View>
    );
}
