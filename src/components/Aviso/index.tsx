import {
    Box,
    View,
    Heading,
    Text,
    Divider
} from "@gluestack-ui/themed";

import { AvisoType } from "@/api/types/AvisoTypes";

export default function AvisoCard({ aviso }: AvisoType) {
    return (
        <Box bg="#D1D1D1" m="$4" style={{ borderRadius: 20 }}>
            <View m="$4">
                <Heading>{aviso?.titulo || 'Nome do Aviso'}</Heading>

                <Divider my="$2" />

                <Text pt="$3">{aviso?.descricao}</Text>
            </View>
        </Box>
    );
}
