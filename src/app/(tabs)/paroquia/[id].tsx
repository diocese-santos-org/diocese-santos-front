import { useState, useEffect } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';

import {
    View,
    Center,
    Text,
    Heading,
    ScrollView,
    VStack
} from "@gluestack-ui/themed";

import { Link, useLocalSearchParams, usePathname } from 'expo-router';

import { getParoquia } from '@/api/DioceseSantosAPI';
import { Paroquia } from '@/api/types/ParoquiaTypes';
import {ActivityIndicator} from "react-native";

export default function ParoquiasScreen() {
    const { id } = useLocalSearchParams();
    const pathname = usePathname();

    const [paroquia, setParoquia] = useState<Paroquia | null>(null);

    const load = async () => {
        getParoquia(pathname?.split('/').pop() || String(id))
            .then(response => setParoquia(response))
            .catch(error => console.log(
                `getParoquia(${id})[error]: ` +
                error
            ));
    }

    useEffect(() => {
        setParoquia(null);
        load();
    }, []);

    const isNull = (value: any) => value === 'NULL' ? null : value;

    const Social = (
        { iconName, href }: { iconName: any, href: string }
    ) =>
        href &&
        <Link
            href={href}
            style={{ marginHorizontal: 10 }}
        >
            <FontAwesome
                name={iconName}
                size={30}
                color="black"
            />
        </Link>

    const Contatos = () =>
        <ScrollView
            horizontal={true}
            marginVertical='$4'
        >
            <Social
                iconName='facebook'
                href={isNull(paroquia?.redesSociais?.facebook)}
            />
            <Social
                iconName='instagram'
                href={isNull(paroquia?.redesSociais?.instagram)}
            />
            <Social
                iconName='youtube'
                href={isNull(paroquia?.redesSociais?.youtube)}
            />
            <Social
                iconName='globe'
                href={isNull(paroquia?.urlSite)}
            />
        </ScrollView>

    const Missas = () =>
        <ScrollView
            horizontal={true}
            marginVertical='$4'
            marginHorizontal='$8'
        >
            {
                isNull(paroquia?.missas.segunda) &&
                <VStack marginHorizontal='$4'>
                    <Text bold>Segunda:</Text>
                    <Text>{paroquia?.missas.segunda}</Text>
                </VStack>
            }
            {
                isNull(paroquia?.missas.terca) &&
                <VStack marginHorizontal='$4'>
                    <Text bold>Terça:</Text>
                    <Text>{paroquia?.missas.terca}</Text>
                </VStack>
            }
            {
                isNull(paroquia?.missas.quarta) &&
                <VStack marginHorizontal='$4'>
                    <Text bold>Quarta:</Text>
                    <Text>{paroquia?.missas.quarta}</Text>
                </VStack>
            }
            {
                isNull(paroquia?.missas.quinta) &&
                <VStack marginHorizontal='$4'>
                    <Text bold>Quinta:</Text>
                    <Text>{paroquia?.missas.quinta}</Text>
                </VStack>
            }
            {
                isNull(paroquia?.missas.sexta) &&
                <VStack marginHorizontal='$4'>
                    <Text bold>Sexta:</Text>
                    <Text>{paroquia?.missas.sexta}</Text>
                </VStack>
            }
            {
                isNull(paroquia?.missas.sabado) &&
                <VStack marginHorizontal='$4'>
                    <Text bold>Sábado:</Text>
                    <Text>{paroquia?.missas.sabado}</Text>
                </VStack>
            }
            {
                isNull(paroquia?.missas.domingo) &&
                <VStack marginHorizontal='$4'>
                    <Text bold>Domingo:</Text>
                    <Text>{paroquia?.missas.domingo}</Text>
                </VStack>
            }
        </ScrollView>

    const Secretaria = () =>
        <ScrollView
            horizontal={true}
            margin='$4'
        >
            {
                isNull(paroquia?.secretaria) &&
                <VStack marginHorizontal='$4'>
                    <Text bold>Secretaria:</Text>
                    <Center>
                        <Text pt="$2">{paroquia?.secretaria}</Text>
                        <Text>{paroquia?.endereco.enderecoCompleto}</Text>
                        <Text>{paroquia?.telefone}</Text>
                    </Center>
                </VStack>
            }
        </ScrollView>

    const Clero = () =>
        <ScrollView margin='$4'>
            {
                paroquia?.cleros &&
                <>
                <Text bold>Clero:</Text>
                {paroquia?.cleros?.map(
                    clero => <Text key={clero?.nome} pt="$4">{clero?.nome}</Text>
                )}
                </>
            }
        </ScrollView>

    const Email = () =>
        <ScrollView margin='$4'>
            {
                paroquia?.email &&
                <>
                    <Text bold>Email:</Text>
                    <Text>{isNull(paroquia?.email)}</Text>
                </>
            }
        </ScrollView>

    return (
        <>
        {
            !paroquia &&
                <Center h={"$full"}>
                    <ActivityIndicator size={"large"}/>
                </Center>
        }
        {
            paroquia &&
            <View key={paroquia?.id}>
                <Center justifyContent="center" pt='$10'>
                    <Heading size='md'>{paroquia?.nome}</Heading>

                    <Secretaria/>

                    <Missas/>

                    <Clero/>

                    <Contatos/>

                    <Email/>

                    {/* <Text pt="$4">{distancia
                        ? distancia.toFixed(0) + ' metros'
                        : 'Distância da Paróquia'}</Text> */}
                </Center>
            </View>
        }
        </>
    );
}
