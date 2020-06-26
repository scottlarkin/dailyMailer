import secrets from '../../secrets/secrets.json';
import IConfig from './IConfig';

// TODO - proper loading & validation
export const config: IConfig = {
    ...secrets,
};
