import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface MetaDataConfigProps {
  id: string;
  category: string;
}
export type OriginMetaDataCommonProps = {
  觉醒前: Array<string>;
  觉醒后: Array<string>;
};
export type MetaDataCommonProps = {
  beforeAwaken: Array<string>;
  afterAwaken: Array<string>;
};
export interface OriginMetaDataContentProps {
  中文名: Array<string>;
  日文名: Array<string>;
  主动技能: {
    技觉后: Array<string>;
  } & OriginMetaDataCommonProps;
  被动技能: OriginMetaDataCommonProps;
  入手方式: Array<string>;
}
export interface MetaDataContentProps {
  cnName: Array<string>;
  jpName: Array<string>;
  activeSkill: {
    skillAwaken: Array<string>;
  } & MetaDataCommonProps;
  passiveSkill: MetaDataCommonProps;
  obtainWay: Array<string>;
}
export interface OriginMetaDataProps {
  config: MetaDataConfigProps;
  data: OriginMetaDataContentProps;
}
export interface MetaDataProps {
  config: MetaDataConfigProps;
  data: MetaDataContentProps;
}

@Injectable({
  providedIn: 'root',
})
export class MetaDataService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http
      .get<OriginMetaDataProps>('../assets/json/template.json')
      .pipe(map(data => this.transform(data)));
  }

  private transform({ config, data }): MetaDataProps {
    const result = {
      config,
      data: {
        cnName: [],
        jpName: [],
        activeSkill: {
          skillAwaken: [],
          beforeAwaken: [],
          afterAwaken: [],
        },
        passiveSkill: { beforeAwaken: [], afterAwaken: [] },
        obtainWay: [],
      },
    };
    const activeSkill = {
      skillAwaken: data['主动技能']['技觉后'],
      beforeAwaken: data['主动技能']['觉醒前'],
      afterAwaken: data['主动技能']['觉醒后'],
    };
    const passiveSkill = {
      beforeAwaken: data['被动技能']['觉醒前'],
      afterAwaken: data['被动技能']['觉醒后'],
    };
    result.data = {
      cnName: data['中文名'],
      jpName: data['日文名'],
      activeSkill,
      passiveSkill,
      obtainWay: data['入手方式'],
    };
    return result;
  }
}
