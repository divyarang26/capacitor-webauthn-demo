/**
 * A variant of PublicKeyCredentialCreationOptions suitable for JSON transmission to the browser to
 * (eventually) get passed into navigator.credentials.create(...) in the browser.
 *
 * This should eventually get replaced with official TypeScript DOM types when WebAuthn L3 types
 * eventually make it into the language:
 *
 * https://w3c.github.io/webauthn/#dictdef-publickeycredentialcreationoptionsjson
 */
export interface PublicKeyCredentialCreationOptionsJSON {
    rp: PublicKeyCredentialRpEntity;
    user: PublicKeyCredentialUserEntityJSON;
    challenge: Base64URLString;
    pubKeyCredParams: PublicKeyCredentialParameters[];
    timeout?: number;
    excludeCredentials?: PublicKeyCredentialDescriptorJSON[];
    authenticatorSelection?: AuthenticatorSelectionCriteria;
    attestation?: AttestationConveyancePreference;
    extensions?: AuthenticationExtensionsClientInputs;
}
/**
 * A variant of PublicKeyCredentialRequestOptions suitable for JSON transmission to the browser to
 * (eventually) get passed into navigator.credentials.get(...) in the browser.
 */
export interface PublicKeyCredentialRequestOptionsJSON {
    challenge: Base64URLString;
    timeout?: number;
    rpId?: string;
    allowCredentials?: PublicKeyCredentialDescriptorJSON[];
    userVerification?: UserVerificationRequirement;
    extensions?: AuthenticationExtensionsClientInputs;
}
/**
 * https://w3c.github.io/webauthn/#dictdef-publickeycredentialdescriptorjson
 */
export interface PublicKeyCredentialDescriptorJSON {
    id: Base64URLString;
    type: PublicKeyCredentialType;
    transports?: AuthenticatorTransportFuture[];
}
/**
 * https://w3c.github.io/webauthn/#dictdef-publickeycredentialuserentityjson
 */
export interface PublicKeyCredentialUserEntityJSON {
    id: string;
    name: string;
    displayName: string;
}
/**
 * The value returned from navigator.credentials.create()
 */
export interface RegistrationCredential extends PublicKeyCredentialFuture {
    response: AuthenticatorAttestationResponseFuture;
}
/**
 * A slightly-modified RegistrationCredential to simplify working with ArrayBuffers that
 * are Base64URL-encoded in the browser so that they can be sent as JSON to the server.
 *
 * https://w3c.github.io/webauthn/#dictdef-registrationresponsejson
 */
export interface RegistrationResponseJSON {
    id: Base64URLString;
    rawId: Base64URLString;
    response: AuthenticatorAttestationResponseJSON;
    authenticatorAttachment?: AuthenticatorAttachment;
    clientExtensionResults: AuthenticationExtensionsClientOutputs;
    type: PublicKeyCredentialType;
}
/**
 * The value returned from navigator.credentials.get()
 */
export interface AuthenticationCredential extends PublicKeyCredentialFuture {
    response: AuthenticatorAssertionResponse;
}
/**
 * A slightly-modified AuthenticationCredential to simplify working with ArrayBuffers that
 * are Base64URL-encoded in the browser so that they can be sent as JSON to the server.
 *
 * https://w3c.github.io/webauthn/#dictdef-authenticationresponsejson
 */
export interface AuthenticationResponseJSON {
    id: Base64URLString;
    rawId: Base64URLString;
    response: AuthenticatorAssertionResponseJSON;
    authenticatorAttachment?: AuthenticatorAttachment;
    clientExtensionResults: AuthenticationExtensionsClientOutputs;
    type: PublicKeyCredentialType;
}
/**
 * A slightly-modified AuthenticatorAttestationResponse to simplify working with ArrayBuffers that
 * are Base64URL-encoded in the browser so that they can be sent as JSON to the server.
 *
 * https://w3c.github.io/webauthn/#dictdef-authenticatorattestationresponsejson
 */
export interface AuthenticatorAttestationResponseJSON {
    clientDataJSON: Base64URLString;
    attestationObject: Base64URLString;
    authenticatorData?: Base64URLString;
    transports?: AuthenticatorTransportFuture[];
    publicKeyAlgorithm?: COSEAlgorithmIdentifier;
    publicKey?: Base64URLString;
}
/**
 * A slightly-modified AuthenticatorAssertionResponse to simplify working with ArrayBuffers that
 * are Base64URL-encoded in the browser so that they can be sent as JSON to the server.
 *
 * https://w3c.github.io/webauthn/#dictdef-authenticatorassertionresponsejson
 */
export interface AuthenticatorAssertionResponseJSON {
    clientDataJSON: Base64URLString;
    authenticatorData: Base64URLString;
    signature: Base64URLString;
    userHandle?: string;
}
/**
 * A WebAuthn-compatible device and the information needed to verify assertions by it
 */
export type AuthenticatorDevice = {
    credentialPublicKey: Uint8Array;
    credentialID: Uint8Array;
    counter: number;
    transports?: AuthenticatorTransportFuture[];
};
/**
 * An attempt to communicate that this isn't just any string, but a Base64URL-encoded string
 */
export type Base64URLString = string;
/**
 * AuthenticatorAttestationResponse in TypeScript's DOM lib is outdated (up through v3.9.7).
 * Maintain an augmented version here so we can implement additional properties as the WebAuthn
 * spec evolves.
 *
 * See https://www.w3.org/TR/webauthn-2/#iface-authenticatorattestationresponse
 *
 * Properties marked optional are not supported in all browsers.
 */
export interface AuthenticatorAttestationResponseFuture extends AuthenticatorAttestationResponse {
    getTransports(): AuthenticatorTransportFuture[];
}
/**
 * A super class of TypeScript's `AuthenticatorTransport` that includes support for the latest
 * transports. Should eventually be replaced by TypeScript's when TypeScript gets updated to
 * know about it (sometime after 4.6.3)
 */
export type AuthenticatorTransportFuture = "ble" | "cable" | "hybrid" | "internal" | "nfc" | "smart-card" | "usb";
/**
 * A super class of TypeScript's `PublicKeyCredentialDescriptor` that knows about the latest
 * transports. Should eventually be replaced by TypeScript's when TypeScript gets updated to
 * know about it (sometime after 4.6.3)
 */
export interface PublicKeyCredentialDescriptorFuture extends Omit<PublicKeyCredentialDescriptor, "transports"> {
    transports?: AuthenticatorTransportFuture[];
}
/**
 *
 */
export type PublicKeyCredentialJSON = RegistrationResponseJSON | AuthenticationResponseJSON;
/**
 * A super class of TypeScript's `PublicKeyCredential` that knows about upcoming WebAuthn features
 */
export interface PublicKeyCredentialFuture extends PublicKeyCredential {
    type: PublicKeyCredentialType;
    isConditionalMediationAvailable?(): Promise<boolean>;
    parseCreationOptionsFromJSON?(options: PublicKeyCredentialCreationOptionsJSON): PublicKeyCredentialCreationOptions;
    parseRequestOptionsFromJSON?(options: PublicKeyCredentialRequestOptionsJSON): PublicKeyCredentialRequestOptions;
    toJSON(): PublicKeyCredentialJSON;
}
/**
 * The two types of credentials as defined by bit 3 ("Backup Eligibility") in authenticator data:
 * - `"singleDevice"` credentials will never be backed up
 * - `"multiDevice"` credentials can be backed up
 */
export type CredentialDeviceType = "singleDevice" | "multiDevice";
