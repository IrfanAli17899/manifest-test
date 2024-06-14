import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type PrivateParamList = {
    Home: undefined;
}


export type PublicParamList = {
    Intro: undefined;
    Auth: undefined;
    SignIn: undefined;
    SignUp: undefined;
};

export type RootStackParamList = {
    Private: NavigatorScreenParams<PrivateParamList> | undefined;
    Public: NavigatorScreenParams<PublicParamList> | undefined;
};


export type RootScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;

export type PrivateScreenProps<Screen extends keyof PrivateParamList> = CompositeScreenProps<
    NativeStackScreenProps<PrivateParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>;

export type PublicScreenProps<Screen extends keyof PublicParamList> = CompositeScreenProps<
    NativeStackScreenProps<PublicParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>;
