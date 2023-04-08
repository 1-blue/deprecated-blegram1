import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Slider, { type Settings } from "react-slick";

// util
import { blurDataURL } from "@src/utils";

// component
import Icon from "@src/components/common/Icon";

// style
import StyledMultiPhoto from "./style";

// type
export interface Props {
  width: number;
  height: number;
  alt: string;
  setPhotos: React.Dispatch<React.SetStateAction<FileList | null>>;
}

/** 2023/04/08 - react-slick setting - by 1-blue */
const settings: Settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  touchMove: true,
  arrows: false,
  dotsClass: "custom-dots",
};

/** 2023/04/08 - 다중 이미지 입력받는 인풋 컴포넌트 - by 1-blue */
const MultiPhotoInput: React.FC<Props> = ({
  width,
  height,
  alt,
  setPhotos,
}) => {
  /** 2023/04/08 - 이미지 ref - by 1-blue */
  const photoRef = useRef<null | HTMLInputElement>(null);
  /** 2023/04/08 - 이미지 미리보기 - by 1-blue */
  const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);

  /** 2023/04/08 - 이미지 미리보기 등록 - by 1-blue */
  const onUploadPreview: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        setPhotos(e.target.files);

        // 이미 프리뷰가 있다면 제거 ( GC에게 명령 )
        if (previewPhotos.length !== 0) {
          previewPhotos.map((previewPhoto) =>
            URL.revokeObjectURL(previewPhoto)
          );
        }

        // 썸네일이 입력되면 브라우저에서만 보여줄 수 있도록 blob url 얻기
        if (e.target.files && e.target.files.length > 0) {
          setPreviewPhotos(
            [...e.target.files].map((file) => URL.createObjectURL(file))
          );
        }
      },
      [previewPhotos, setPhotos]
    );
  /** 2023/04/08 - 이미지 업로드 취소 - by 1-blue */
  const onCancelPhoto = useCallback(() => {
    previewPhotos.map((previewPhoto) => URL.revokeObjectURL(previewPhoto));
    setPhotos(null);
    setPreviewPhotos([]);
  }, [previewPhotos, setPhotos]);
  /** 2023/04/08 - 새로운 이미지 업로드하면 Blob 할당 해제 - by 1-blue */
  useEffect(() => {
    if (!photoRef.current) return;

    photoRef.current.onload = () => {
      previewPhotos.map((previewPhoto) => URL.revokeObjectURL(previewPhoto));
    };
  }, [previewPhotos]);

  return (
    <StyledMultiPhoto width={width - 24} height={height}>
      {/* 이미지 입력받는 인풋 */}
      <input
        type="file"
        accept="image/*"
        hidden
        ref={photoRef}
        onChange={onUploadPreview}
        multiple
      />

      {/* preview || 이미지 */}
      <figure>
        <Slider {...settings}>
          {previewPhotos.map((previewPhoto) => (
            <Image
              key={previewPhoto}
              src={previewPhoto}
              alt={alt}
              width={width - 24}
              height={height - 12}
              quality={75}
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          ))}
        </Slider>

        {previewPhotos.length === 0 && <Icon shape={"photo"} size="xl" fill />}

        {/* 마우스 hover 시 보여줄 fg */}
        {previewPhotos.length === 0 && (
          <button type="button" onClick={() => photoRef.current?.click()}>
            <Icon shape={"photo"} size="2xl" fill />
          </button>
        )}
      </figure>

      {/* 이미지 업로드 확인 모달 */}
      {previewPhotos.length !== 0 && (
        <section className="modal">
          <button type="button" onClick={onCancelPhoto}>
            이미지 취소
          </button>
        </section>
      )}
    </StyledMultiPhoto>
  );
};

export default MultiPhotoInput;
