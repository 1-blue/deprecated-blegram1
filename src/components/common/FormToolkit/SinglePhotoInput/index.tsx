import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

// util
import { blurDataURL, combinePhotoURL } from "@src/utils";

// component
import Icon from "@src/components/common/Icon";

// style
import StyledSinglePhotoInput, { StyledConfirmModal } from "./style";

// type
interface Props {
  width: number;
  height: number;
  src: string | null;
  alt: string;
  onUploadPhoto: (filelist: null | FileList) => Promise<void>;
}

/** 2023/04/02 - 단일 이미지 입력받는 인풋 컴포넌트 - by 1-blue */
const SinglePhotoInput: React.FC<Props> = ({
  width,
  height,
  src,
  alt,
  onUploadPhoto,
}) => {
  /** 2023/04/02 - 이미지 input value - by 1-blue */
  const [photo, setPhoto] = useState<null | FileList>(null);
  /** 2023/04/02 - 이미지 ref - by 1-blue */
  const photoRef = useRef<null | HTMLInputElement>(null);
  /** 2023/04/02 - 이미지 미리보기 - by 1-blue */
  const [previewPhoto, setPreviewPhoto] = useState("");

  /** 2023/04/02 - 이미지 미리보기 등록 - by 1-blue */
  const onUploadPreview: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        setPhoto(e.target.files);

        // 이미 프리뷰가 있다면 제거 ( GC에게 명령 )
        if (previewPhoto) URL.revokeObjectURL(previewPhoto);

        // 썸네일이 입력되면 브라우저에서만 보여줄 수 있도록 blob url 얻기
        if (e.target.files && e.target.files.length > 0) {
          setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
        }
      },
      [previewPhoto]
    );
  /** 2023/04/02 - 이미지 업로드 취소 - by 1-blue */
  const onCancelPhoto = useCallback(() => {
    URL.revokeObjectURL(previewPhoto);
    setPhoto(null);
    setPreviewPhoto("");
  }, [previewPhoto]);
  /** 2023/04/02 - 새로운 이미지 업로드하면 Blob 할당 해제 - by 1-blue */
  useEffect(() => {
    if (!photoRef.current) return;

    photoRef.current.onload = () => URL.revokeObjectURL(previewPhoto);
  }, [previewPhoto]);
  /** 2023/04/02 - 이미지 업로드 - by 1-blue */
  const onUploadPhotoFunc = useCallback(async () => {
    await onUploadPhoto(photo);
    onCancelPhoto();
  }, [onUploadPhoto, photo, onCancelPhoto]);

  /** preview || photo */
  let path = "";

  // 미리보기 이미지가 있는 경우
  if (previewPhoto) path = previewPhoto;
  else if (src) {
    // "AWS-S3"에 업로드된 이미지인 경우
    if (src.includes(process.env.NODE_ENV + "/images/"))
      path = combinePhotoURL(src);
    // 다른곳에서 제공받은 이미지인 경우
    else path = src;
  }

  return (
    <>
      <StyledSinglePhotoInput
        width={width}
        height={height}
        type="button"
        onClick={() => photoRef.current?.click()}
      >
        {/* 이미지 입력받는 인풋 */}
        <input
          type="file"
          accept="image/*"
          hidden
          ref={photoRef}
          onChange={onUploadPreview}
        />
        {/* preview || 이미지 */}
        <figure>
          {path && (
            <Image
              src={path}
              alt={alt}
              fill
              quality={75}
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          )}
        </figure>
        {/* 마우스 hover 시 보여줄 fg */}
        <div>
          <Icon shape={previewPhoto ? "arrow-path" : "plus"} size="xl" fill />
        </div>
      </StyledSinglePhotoInput>

      {/* 이미지 업로드 확인 모달 */}
      {previewPhoto && (
        <StyledConfirmModal>
          <button type="button" onClick={onUploadPhotoFunc}>
            이미지 저장
          </button>
          <button type="button" onClick={onCancelPhoto}>
            이미지 취소
          </button>
        </StyledConfirmModal>
      )}
    </>
  );
};

export default SinglePhotoInput;
