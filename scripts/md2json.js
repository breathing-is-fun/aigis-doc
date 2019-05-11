const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

const string2Object = dataItem => {
  const item = dataItem.split(':');
  return { [item[0].trim()]: item[1].trim() };
};

const getContentBetweenSplits = (prefix, suffix, dataSource, flag) => {
  const prefixString = dataSource
    .split(prefix)[1]
    .split(suffix)[0]
    .trim();
  if (!flag) {
    return prefixString.split(/[\r\n]+/).map(item => item.trim());
  }
  return prefixString;
};

// 获得开头 --- 中间的参数，用作过滤条件
// 第一行只能以 --- 开头
const getConfig = dataSource => {
  let result = {};
  const tempArr = dataSource.slice(1, dataSource.length - 1);
  const splitIndex = tempArr.findIndex(item => item === '---') + 1;
  for (let i = 1; i < splitIndex; i++) {
    const item = dataSource[i];
    result = { ...result, ...string2Object(item) };
  }
  return result;
};

// 本来应该写递归获得俩 # 之间的文字
// 但业务还没稳定下来，所以用硬编码减少脑力消耗
// todo(refactor): 递归消除硬编码
const getSkillData = dataSource => {
  const result = {
    中文名: [],
    日文名: [],
    入手方式: [],
    被动技能: {
      觉醒前: [],
      觉醒后: [],
    },
    主动技能: {
      觉醒前: [],
      觉醒后: [],
      技觉后: [],
    },
  };
  result.中文名 = getContentBetweenSplits('## 中文名', '## 日文名', dataSource);
  result.日文名 = getContentBetweenSplits(
    '## 日文名',
    '## 入手方式',
    dataSource,
  );
  result.入手方式 = getContentBetweenSplits(
    '## 入手方式',
    '## 被动技能',
    dataSource,
  );
  result.被动技能.觉醒前 = getContentBetweenSplits(
    '### 觉醒前',
    '### 觉醒后',
    getContentBetweenSplits('## 被动技能', '## 主动技能', dataSource, true),
  );
  result.被动技能.觉醒后 = getContentBetweenSplits(
    '### 觉醒后',
    '## 主动技能',
    getContentBetweenSplits('## 被动技能', '## 主动技能', dataSource, true),
  );
  result.主动技能.觉醒前 = getContentBetweenSplits(
    '### 觉醒前',
    '### 觉醒后',
    getContentBetweenSplits('## 主动技能', '---', dataSource, true),
  );
  result.主动技能.觉醒后 = getContentBetweenSplits(
    '### 觉醒后',
    '### 技觉后',
    getContentBetweenSplits('## 主动技能', '---', dataSource, true),
  );
  result.主动技能.技觉后 = getContentBetweenSplits(
    '### 技觉后',
    '---',
    dataSource,
  );
  return result;
};

// 获得人物头像地址
const getAvatarUrl = tags => {
  const pattern = /<img[^>]+src=['"]([^'"]+)['"]+/g;
  let result = [];
  let temp;
  while ((temp = pattern.exec(tags))) {
    result.push(temp[1]);
  }
  return {
    未觉醒图片地址: result[0],
    觉醒图片地址: result[1],
    二觉图片地址: result[2],
  };
};

const assignBoardItem = (key, item) => {
  const result = {};

  if (item.includes(key)) {
    result[key] = item.split('>')[1].split('<')[0];
  }
  return result;
};

// 获得人物面板数据
const getTableData = dataSource => {
  let result = {};
  let keys = [];

  // 获得标识字符
  for (let item of dataSource) {
    if (item.includes('data-')) {
      keys.push(item.split('data-')[1].split('>')[0]);
    }
  }
  keys = Array.from(new Set(keys));

  for (let item of dataSource) {
    if (item.includes('<img')) {
      result = getAvatarUrl(item);
      continue;
    }
    for (let key of keys) {
      result = { ...result, ...assignBoardItem(key, item) };
    }
  }
  return result;
};

glob('src/assets/markdown/*.md', (_, files) => {
  files.forEach(filePath => {
    const fileName = path.basename(filePath, '.md');
    const content = fs.readFileSync(filePath, 'utf8');
    const config = getConfig(content.split(/[\r\n]+/));
    const skillData = getSkillData(content);
    const boardData = getTableData(content.split(/[\r\n]+/));
    fs.outputJSON(
      path.join(process.cwd(), `src/assets/json/${fileName}.json`),
      { config, skillData, boardData },
      { spaces: 2 },
    )
      .then(() => {
        console.log(fileName + ' => completed');
      })
      .catch(err => {
        console.error(err);
      });
  });
});
