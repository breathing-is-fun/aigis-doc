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
export interface OriginMetaBoardDataProps {
  未觉醒图片地址: string;
  觉醒图片地址: string;
  二觉图片地址: string;
  未觉醒一级hp: string;
  未觉醒一级攻击: string;
  未觉醒一级物防: string;
  未觉醒满级hp: string;
  未觉醒满级攻击: string;
  未觉醒满级物防: string;
  未觉醒魔防: string;
  未觉醒cost上限: string;
  未觉醒cost下限: string;
  未觉醒好感攻击加成: string;
  未觉醒好感物防加成: string;
  未觉醒挡数: string;
  觉醒一级hp: string;
  觉醒一级攻击: string;
  觉醒一级物防: string;
  觉醒满级hp: string;
  觉醒满级攻击: string;
  觉醒满级物防: string;
  觉醒魔防: string;
  觉醒cost上限: string;
  觉醒cost下限: string;
  觉醒好感攻击加成: string;
  觉醒好感物防加成: string;
  觉醒挡数: string;
}
export interface OriginMetaDataProps {
  config: MetaDataConfigProps;
  data: OriginMetaDataContentProps;
}
export interface MetaBoardDataProps {
  beforeImgUrl: string;
  afterImgUrl: string;
  twiceImgUrl: string;
  beforeMinHp: string;
  beforeMinAttack: string;
  beforeMinPhysicalDefense: string;
  beforeMaxHp: string;
  beforeMaxAttack: string;
  beforeMaxPhysicalDefense: string;
  beforeMagicDefense: string;
  beforeBlock: string;
  beforeCostUpperLimit: string;
  beforeCostLowerLimit: string;
  beforeRewardAttack: string;
  beforeRewardPhysicalDefense: string;
  afterMinHp: string;
  afterMinAttack: string;
  afterMinPhysicalDefense: string;
  afterMaxHp: string;
  afterMaxAttack: string;
  afterMaxPhysicalDefense: string;
  afterMagicDefense: string;
  afterBlock: string;
  afterCostUpperLimit: string;
  afterCostLowerLimit: string;
  afterRewardAttack: string;
  affterRewardPhysicalDefense: string;
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
