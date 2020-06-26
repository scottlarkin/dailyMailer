import {IHttp} from './IHttp';
import axios from 'axios';
import {injectable} from 'inversify';

@injectable()
export class Http implements IHttp {
    async get<T>(url: string) {
      return (await axios.get<T>(url)).data;
    }
}
