import {
    Center,
    VStack,
    View,
    Button,
    ButtonText
} from "@gluestack-ui/themed";

import FontAwesome from '@expo/vector-icons/FontAwesome5';

import { Link } from "expo-router";

export default function MenuScreen() {
    return (
        <View>
            <Center justifyContent="center" h="$full">
                <VStack space="xl" reversed={false}>
                    <Link href="/(tabs)/mapa" asChild>
                        <Button size="lg" variant="solid">
                            <FontAwesome name='map' color={'#fff'} size={25} />
                            <ButtonText pl="$4">Mapa</ButtonText>
                        </Button>
                    </Link>
                    <Link href="/(tabs)/paroquia/" asChild>
                        <Button size="lg" variant="solid">
                            <FontAwesome name='church' color={'#fff'} size={25} />
                            <ButtonText pl="$4">Paróquias</ButtonText>
                        </Button>
                    </Link>
                    <Link href="/(tabs)/evento/" asChild>
                        <Button size="lg" variant="solid">
                            <FontAwesome name='calendar' color={'#fff'} size={25} />
                            <ButtonText pl="$4">Eventos</ButtonText>
                        </Button>
                    </Link>
                    <Link href="/(tabs)/aviso/" asChild>
                        <Button size="lg" variant="solid">
                            <FontAwesome name='book-open' color={'#fff'} size={25} />
                            <ButtonText pl="$4">Avisos</ButtonText>
                        </Button>
                    </Link>
                </VStack>
            </Center>
        </View>
    );
}
