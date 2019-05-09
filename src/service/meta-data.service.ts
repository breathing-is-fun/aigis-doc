import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface MetaDataConfigProps {
  id: string;
  category: string;
}
export interface OriginMetaDataCommonProps {
  觉醒前: string[];
  觉醒后: string[];
}
export interface MetaDataCommonProps {
  beforeAwaken: string[];
  afterAwaken: string[];
}
export interface OriginMetaDataContentProps {
  中文名: string[];
  日文名: string[];
  主动技能: {
    技觉后: string[];
  } & OriginMetaDataCommonProps;
  被动技能: OriginMetaDataCommonProps;
  入手方式: string[];
}
export interface MetaDataContentProps {
  cnName: string[];
  jpName: string[];
  activeSkill: {
    skillAwaken: string[];
  } & MetaDataCommonProps;
  passiveSkill: MetaDataCommonProps;
  obtainWay: string[];
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
      skillAwaken: data.主动技能.技觉后,
      beforeAwaken: data.主动技能.觉醒前,
      afterAwaken: data.主动技能.觉醒后,
    };
    const passiveSkill = {
      beforeAwaken: data.被动技能.觉醒前,
      afterAwaken: data.被动技能.觉醒后,
    };
    result.data = {
      cnName: data.中文名,
      jpName: data.日文名,
      activeSkill,
      passiveSkill,
      obtainWay: data.入手方式,
    };
    return result;
  }
}
