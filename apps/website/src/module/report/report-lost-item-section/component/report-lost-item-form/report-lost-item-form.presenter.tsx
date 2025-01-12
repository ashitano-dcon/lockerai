'use client';

import { Button } from '@lockerai/core/component/button';
import { Image } from '@lockerai/core/component/image';
import { toast } from '@lockerai/core/component/sonner';
import { AddingImageIcon } from '@lockerai/core/icon/adding-image-icon';
import { CrossIcon } from '@lockerai/core/icon/cross-icon';
import { ErrorIcon } from '@lockerai/core/icon/error-icon';
import { SubmitIcon } from '@lockerai/core/icon/submit-icon';
import { cn } from '@lockerai/tailwind';
import { AnimatePresence, motion } from 'framer-motion';
import { type ChangeEvent, type ComponentPropsWithoutRef, type FormEvent, useCallback, useState } from 'react';

type ImageFileData = {
  file: File;
  image: string;
};

type ReportLostItemFormProps = Omit<ComponentPropsWithoutRef<'form'>, 'children' | 'className'> & {
  reportLostItem: (imageFiles: File[]) => Promise<void>;
};

export const ReportLostItemForm = ({ reportLostItem, ...props }: ReportLostItemFormProps) => {
  const [imageFiles, setImageFiles] = useState<ImageFileData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length <= 0) {
      return;
    }

    Array.from(fileList).forEach((file) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageFiles((prev) => [...prev, { file, image: fileReader.result as string }]);
      };

      fileReader.readAsDataURL(file);
    });
  }, []);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setLoading(true);

      const res = await reportLostItem(imageFiles.map((imageFile) => imageFile.file)).catch((error) => {
        toast.error('Failed to report lost item.', {
          description: error.message.replace('[GraphQL] ', ''),
          icon: <ErrorIcon />,
        });

        setLoading(false);

        return null;
      });
      if (res === null) {
        return;
      }

      setImageFiles([]);
      setLoading(false);
    },
    [imageFiles, reportLostItem],
  );

  const disabled = imageFiles.length <= 0 || loading;

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col items-end gap-6" {...props}>
      <Button
        type="submit"
        disabled={disabled}
        variant={{
          color: disabled ? 'sage' : 'green',
          border: true,
          width: 'fit',
          loading,
        }}
      >
        report
        <SubmitIcon className={cn('h-4 w-4', disabled ? 'fill-sage-11' : 'fill-green-11')} />
      </Button>
      <div className="relative h-72 w-full rounded-2xl border-2 border-dotted border-green-7 p-5 tablet:h-[400px]">
        <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4">
          <AddingImageIcon className="h-28 w-28 fill-green-7 tablet:h-[200px] tablet:w-[200px]" />
          <span className="text-base text-sage-11 tablet:text-2xl">Drag and drop or select images of the lost item.</span>
          <input type="file" accept="image/*" multiple onChange={onChange} className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0" />
        </label>
        <div className="absolute left-4 top-4 flex max-w-full flex-wrap items-center gap-4 tablet:left-14 tablet:top-7 tablet:gap-6">
          <AnimatePresence>
            {imageFiles.map((imageFile) => (
              <motion.div
                key={imageFile.file.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                layout
                className="relative"
              >
                <Image
                  src={imageFile.image}
                  alt={imageFile.file.name}
                  width={240}
                  height={160}
                  skeleton={{
                    className: 'rounded-2xl',
                  }}
                  className="h-[80px] w-[120px] object-cover tablet:h-[160px] tablet:w-[240px]"
                />
                <span className="absolute right-2 top-2">
                  <Button
                    type="button"
                    icon={CrossIcon}
                    variant={{ color: 'sage', 'as-icon': true }}
                    onClick={() => {
                      setImageFiles((prev) => prev.filter((prevImageFile) => prevImageFile.file.name !== imageFile.file.name));
                    }}
                  />
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
};
