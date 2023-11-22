import {
    Center,
    VStack,
    View,
    Button,
    ButtonText
} from "@gluestack-ui/themed";

export default function MenuScreen() {
    return (
        <View pt="$20">
            <Center h="$80" justifyContent="center">
                <VStack space="md" reversed={false}>
                    <Button>
                        <ButtonText>Mapa</ButtonText>
                    </Button>
                    <Button>
                        <ButtonText>Paróquias</ButtonText>
                    </Button>
                    <Button>
                        <ButtonText>Eventos</ButtonText>
                    </Button>
                    <Button>
                        <ButtonText>Avisos</ButtonText>
                    </Button>
                </VStack>
            </Center>
        </View>
    );
}
