import { FC, JSX, memo, useEffect, useState } from "react";
import apiDocxDeleteDocx from "@/api/docx/apiDocxDeleteDocx.api";
import apiDocxGetDocxs from "@/api/docx/apiDocxGetDocxs.api";
import apiDocxSaveDocx from "@/api/docx/apiDocxSaveDocx.api";
import apiDocxTestDocx from "@/api/docx/apiDocxTestDocx.api";
import Input from "@/shared/Input";
import DocumentType from "@/types/DocumentType.type";
import IDocx, { IDocxFieldsField } from "@/types/IDocx.interface";
import getFileUrl from "@/utils/getFileUrl";

const SettingsDocs: FC = memo((): JSX.Element => {
  const [docxs, setDocxs] = useState<Partial<Record<DocumentType, IDocx>>>({});

  useEffect(() => {
    getDocxs();
  }, []);

  const saveDocx = async ({
    fileKey,
    fileType,
  }: {
    fileKey: IDocx["file_key"];
    fileType: IDocx["file_type"];
  }) => {
    const res = await apiDocxSaveDocx({
      file_key: fileKey,
      file_type: fileType,
    });
    if (res.status) await getDocxs();
  };

  const getDocxs = async () => {
    const res = await apiDocxGetDocxs();
    if (res.status && res.data) setDocxs(res.data);
  };

  const deleteDocx = async (id: IDocx["id"]) => {
    const res = await apiDocxDeleteDocx({ id });
    if (res.status) await getDocxs();
  };

  const testDocx = async (fileType: IDocx["file_type"]) => {
    if (!fileType) return;
    const res = await apiDocxTestDocx({
      file_type: docxs[fileType]?.file_type,
    });
    if (res.status) {
      setDocxs({
        ...docxs,
        [fileType]: {
          ...docxs[fileType],
          pdfFileKey: res.data,
        },
      });
    }
  };

  const Component: FC<{ title: string; fileType: IDocx["file_type"] }> = memo(
    ({ title, fileType }): JSX.Element => {
      if (!fileType) return <></>;
      return (
        <div>
          <br />
          <br />
          <br />
          <h1>{title}</h1>
          {docxs[fileType]?.file_key && (
            <div>
              <a
                href={getFileUrl(docxs[fileType]?.file_key, "docx") || ""}
                download
                target="_blank"
              >
                Скачать документ
              </a>
            </div>
          )}
          <Input
            type="file"
            placeholder={title}
            value={docxs[fileType]?.file_key || ""}
            onChange={(e) => {
              saveDocx({
                fileKey: e.target.value,
                fileType: fileType,
              });
            }}
            accept={["docx"]}
          />
          {docxs[fileType] && (
            <>
              {docxs[fileType]?.fields && (
                <div>
                  <p>Поля:</p>
                  {docxs[fileType]?.fields?.map((field: IDocxFieldsField) => (
                    <p key={field.field}>
                      {field.field} - {field.fieldRu}
                    </p>
                  ))}
                </div>
              )}
              <div>
                <button onClick={() => testDocx(fileType)}>Тест</button>
                <button onClick={() => deleteDocx(docxs[fileType]?.id)}>
                  Удалить
                </button>
              </div>

              {docxs[fileType]?.pdfFileKey && (
                <div>
                  <a
                    href={getFileUrl(docxs[fileType]?.pdfFileKey, "pdf") || ""}
                    download
                    target="_blank"
                  >
                    Скачать pdf файл
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      );
    }
  );

  return (
    <>
      <Component
        title="ДОГОВОР ПРИСОЕДИНЕНИЯ"
        fileType={"accession_agreement"}
      />
      <Component
        title="ЗАЯВЛЕНИЕ О ПРИСОЕДИНЕНИИ"
        fileType={"accession_application"}
      />
      <Component
        title="ДОГОВОР АРЕНДЫ РАБОЧЕГО МЕСТА С МАСТЕРОМ НОГТЕВОГО СЕРВИСА"
        fileType={"workplace_rent_nail_master"}
      />
      <Component
        title="АКТ ПРИЕМА-ПЕРЕДАЧИ РАБОЧЕГО МЕСТА В АРЕНДУ МАСТЕРОМ НОГТЕВОГО СЕРВИСА"
        fileType={"workplace_transfer_act_nail"}
      />
      <Component
        title="АКТ ВОЗВРАТА РАБОЧЕГО МЕСТА ИЗ АРЕНДЫ МАСТЕРОМ НОГТЕВОГО СЕРВИСА"
        fileType={"workplace_return_act_nail"}
      />
      <Component
        title="ДОГОВОР АРЕНДЫ РАБОЧЕГО МЕСТА С МАСТЕРОМ-БРОВИСТОМ"
        fileType={"workplace_rent_brow_master"}
      />
      <Component
        title="АКТ ПРИЕМА-ПЕРЕДАЧИ РАБОЧЕГО МЕСТА В АРЕНДУ МАСТЕРОМ-БРОВИСТОМ"
        fileType={"workplace_transfer_act_brow"}
      />
      <Component
        title="АКТ ВОЗВРАТА РАБОЧЕГО МЕСТА ИЗ АРЕНДЫ МАСТЕРОМ БРОВИСТОМ"
        fileType={"workplace_return_act_brow"}
      />
      <Component
        title="АГЕНТСКИЙ ДОГОВОР С МАСТЕРАМИ"
        fileType={"agent_agreement"}
      />
      <Component
        title="ПОРЯДОК ОПРЕДЕЛЕНИЯ ВОЗНАГРАЖДЕНИЯ АГЕНТА"
        fileType={"agent_compensation_policy"}
      />
      <Component
        title="ОТЧЕТ АГЕНТА О ВЫПОЛНЕНИИ ПОРУЧЕНИЯ ПРИНЦИПАЛА"
        fileType={"agent_report"}
      />
      <Component title="АКТ ОКАЗАННЫХ УСЛУГ" fileType={"service_act"} />
      <Component
        title="УВЕДОМЛЕНИЕ ОБ ОТКАЗЕ ОТ АГЕНТСКОГО ДОГОВОРА"
        fileType={"agent_termination_notice"}
      />
    </>
  );
});

export default SettingsDocs;
