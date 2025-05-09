import { useMutation } from '@urql/next';
import type { LostItem } from '#website/common/model/lost-item';
import type { User } from '#website/common/model/user';
import { i18nTextSchema } from '#website/i18n/locales';
import { ReportLostItemDocument, type ReportLostItemMutation, type ReportLostItemMutationVariables } from '#website/infra/graphql/generated/graphql';

type ExecuteInput = {
  imageFiles: File[];
  reporterId: User['id'];
};

type Execute = (input: ExecuteInput) => Promise<LostItem>;

type UseReportLostItemUseCase = () => [LostItem | undefined, Execute];

export const useUseReportLostItemUseCase: UseReportLostItemUseCase = () => {
  const [{ data }, execute] = useMutation<ReportLostItemMutation, ReportLostItemMutationVariables>(ReportLostItemDocument);

  const reportLostItem: Execute = async (input) => {
    const { data: executedData, error: executedError } = await execute(
      {
        imageFiles: input.imageFiles,
        lostItem: {
          reporterId: input.reporterId,
        },
      },
      {
        fetchOptions: {
          headers: {
            // NOTE: Apollo Server v4 enables CSRF protection by default, so preflight needs to be explicit.
            // https://www.apollographql.com/docs/apollo-server/security/cors/#graphql-upload
            'Apollo-Require-Preflight': 'true',
          },
        },
      },
    );
    if (!executedData || executedError) {
      throw executedError || new Error('Failed to report lost item.');
    }

    return (
      executedData && {
        id: executedData.reportLostItem.id,
        title: executedData.reportLostItem.title,
        titleI18n: i18nTextSchema.parse(executedData.reportLostItem.titleI18n),
        description: executedData.reportLostItem.description,
        descriptionI18n: i18nTextSchema.parse(executedData.reportLostItem.descriptionI18n),
        imageUrls: executedData.reportLostItem.imageUrls,
        reportedAt: executedData.reportLostItem.reportedAt,
        ownedAt: executedData.reportLostItem.ownedAt ?? null,
        deliveredAt: executedData.reportLostItem.deliveredAt ?? null,
        retrievedAt: executedData.reportLostItem.retrievedAt ?? null,
      }
    );
  };

  return [
    data && {
      id: data.reportLostItem.id,
      title: data.reportLostItem.title,
      titleI18n: i18nTextSchema.parse(data.reportLostItem.titleI18n),
      description: data.reportLostItem.description,
      descriptionI18n: i18nTextSchema.parse(data.reportLostItem.descriptionI18n),
      imageUrls: data.reportLostItem.imageUrls,
      reportedAt: data.reportLostItem.reportedAt,
      ownedAt: data.reportLostItem.ownedAt ?? null,
      deliveredAt: data.reportLostItem.deliveredAt ?? null,
      retrievedAt: data.reportLostItem.retrievedAt ?? null,
    },
    reportLostItem,
  ];
};
