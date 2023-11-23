import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import MenuScreen from "./src/screens/menu";

export default function App() {
    return (
        <GluestackUIProvider config={config}>
            <MenuScreen />
        </GluestackUIProvider>
    );
}
