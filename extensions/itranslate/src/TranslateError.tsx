import {
  Color,
  Action,
  Detail,
  ActionPanel,
  openCommandPreferences,
  getPreferenceValues,
  List,
  Icon,
} from "@raycast/api";
import { LANG_LIST, TransServiceProviderTp, TRANS_SERVICES_AUTH_NAMES, TRANS_SERVICES_NAMES } from "./const";

export function TranslateError(props: { transRes: ITranslateRes }) {
  const icon = { source: Icon.XMarkCircle, tintColor: Color.Red };
  return (
    <List.Item
      icon={{ source: `${props.transRes.serviceProvider}.png` }}
      title="Opps!!"
      accessories={[{ icon }]}
      detail={<List.Item.Detail markdown={`Sorry! We have some problems...`} />}
    />
  );
}

export function TranslateNotSupport(props: { transRes: ITranslateRes }) {
  const icon = { source: Icon.Warning, tintColor: Color.SecondaryText };
  return (
    <List.Item
      icon={{ source: `${props.transRes.serviceProvider}.png` }}
      title="Not support~~"
      accessories={[{ icon }]}
      detail={
        <List.Item.Detail
          markdown={`Sorry! ${TRANS_SERVICES_NAMES.get(props.transRes.serviceProvider)} does not support ${
            props.transRes.to.langTitle
          } yet...`}
        />
      }
    />
  );
}

export function LanguageConflict() {
  const preferences: IPreferences = getPreferenceValues<IPreferences>();
  const langFirst = LANG_LIST.find((lang) => lang.langId == preferences.langFirst) || LANG_LIST[0];
  const langSecond = LANG_LIST.find((lang) => lang.langId == preferences.langSecond) || LANG_LIST[1];
  const markdown = `
  # Language Conflict \n
  Your first Language with second Language must be different.\n
  > ⚙️ Please enter \`↵\` to open iTranslate Preferences and update the language configuration ~
  `;
  return (
    <Detail
      markdown={markdown}
      navigationTitle="Language Conflict"
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.TagList title="First language you selected">
            <Detail.Metadata.TagList.Item text={langFirst?.langTitle} color={Color.Green} />
          </Detail.Metadata.TagList>
          <Detail.Metadata.TagList title="Second language you selected">
            <Detail.Metadata.TagList.Item text={langSecond?.langTitle} color={Color.Blue} />
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
          <Action icon={Icon.ComputerChip} title="Open iTranslate Preferences" onAction={openCommandPreferences} />
        </ActionPanel>
      }
    />
  );
}

export function ServiceProviderMiss(props: { service: TransServiceProviderTp; disabled?: boolean }) {
  const auth_names = TRANS_SERVICES_AUTH_NAMES.get(props.service);
  const markdown = `
  # Welcome to use iTranslate 🎉🎉🎉 \n
  iTranslate is a translation extension that can customize translation service providers and support multiple languages\n
  Now we support this translation service providers: [Google(Free)](https://translate.google.cn),[Google Could Translation](https://cloud.google.com/translate),[Deepl](https://www.deepl.com/pro-api?cta=header-pro-api),[Microsoft Azure](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/quickstart-translator?tabs=csharp),[Youdao](https://ai.youdao.com),[Baidu](https://fanyi-api.baidu.com),[Tencent](https://fanyi.qq.com/translateapi),[Aliyun](https://www.alibabacloud.com/product/machine-translation)\n
  ## Before using the extension, follow these steps:
  1. Please enter \`↵\` to open iTranslate Preferences ⚙️
  ${
    props.disabled
      ? `2. Enable *${TRANS_SERVICES_NAMES.get(props.service)}* in the right area of the preferences window`
      : `2. Config ${auth_names?.map((n) => `**${n}**`).join(" and ")} in the right area of the preferences window`
  }
  > ⚠️ The default translation service provider you selected is *${TRANS_SERVICES_NAMES.get(props.service)}*\n
  # 🍻 Enjoy it !
  `;
  return (
    <Detail
      markdown={markdown}
      navigationTitle="Welcome to use iTranslate"
      actions={
        <ActionPanel>
          <Action icon={Icon.ComputerChip} title="Open iTranslate Preferences" onAction={openCommandPreferences} />
        </ActionPanel>
      }
    />
  );
}
