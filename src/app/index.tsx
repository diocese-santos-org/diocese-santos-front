import {
    Center,
    VStack,
    View,
    Button,
    ButtonText
} from "@gluestack-ui/themed";
import { Link } from "expo-router";

export default function MenuScreen() {
    return (
        <View pt="$20">
            <Center h="$80" justifyContent="center">
                <VStack space="md" reversed={false}>
                    <Link href="/(tabs)/mapa" asChild>
                        <Button>
                            <ButtonText>Mapa</ButtonText>
                        </Button>
                    </Link>
                    <Link href="/(tabs)/paroquia/" asChild>
                        <Button>
                            <ButtonText>Paróquias</ButtonText>
                        </Button>
                    </Link>
                    <Link href="/(tabs)/evento/" asChild>
                        <Button>
                            <ButtonText>Eventos</ButtonText>
                        </Button>
                    </Link>
                    <Link href="/(tabs)/aviso/" asChild>
                        <Button>
                            <ButtonText>Avisos</ButtonText>
                        </Button>
                    </Link>
                </VStack>
            </Center>
        </View>
    );
}
