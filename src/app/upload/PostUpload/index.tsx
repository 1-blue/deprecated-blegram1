"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// api
import { apiServicePhoto, apiServicePhotos } from "@src/apis";

// hook
import useInnerSize from "@src/hooks/useInnerSize";
import { usePost } from "@src/hooks/query";

// component
import FormToolkit from "@src/components/common/FormToolkit";
import Spinner from "@src/components/common/Spinner";

// style
import StyledPostUpload from "./style";

// type
interface PostForm {
  content: string;
}

/** 2023/04/08 - 게시글 업로드 페이지 - by 1-blue  */
const PostUpload = () => {
  /** 2023/04/08 - 현재 브라우저 width - by 1-blue */
  const [innerWidth] = useInnerSize();
  /** 2023/04/08 - 게시글 업로드 훅 - by 1-blue */
  const uploadPostMudate = usePost.useUploadPost();
  /** 2023/04/08 - 게시글 업로드중인지 판단할 변수 - by 1-blue */
  const [isUploadPost, setIsUploadPost] = useState(false);
  /** 2023/04/08 - 이미지 input value - by 1-blue */
  const [photos, setPhotos] = useState<null | FileList>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostForm>();

  /** 2023/04/08 - 게시글 업로드 핸들러 - by 1-blue */
  const onUploadPost: React.FormEventHandler<HTMLFormElement> = handleSubmit(
    useCallback(
      async ({ content }) => {
        if (!photos?.length) return toast.warning("이미지를 등록해주세요!");

        try {
          setIsUploadPost(true);

          // "presignedURL"들 생성 및 가져오기
          const { presignedURLs } =
            await apiServicePhotos.apiFetchPresignedURLs({
              names: [...photos].map((photo) => photo.name),
            });

          // "AWS-S3"에 이미지들 등록
          await Promise.all(
            presignedURLs.map((presignedURL, i) =>
              apiServicePhoto.apiUploadPhoto({ presignedURL, file: photos[i] })
            )
          );

          // 완성될 이미지 경로들 얻기
          const photoPaths = presignedURLs.map((presignedURL) =>
            presignedURL
              .slice(0, presignedURL.indexOf("?"))
              .slice(presignedURL.indexOf(process.env.NODE_ENV))
          );

          // 게시글 업로드
          uploadPostMudate({ content, photoPaths });
        } catch (error) {
          console.error("게시글 업로드 에러 >> ", error);
        } finally {
          setIsUploadPost(false);
        }
      },
      [photos, uploadPostMudate]
    )
  );

  /** 2023/04/08 - 여러 이미지 입력받는 인풋창 렌더링 크기에 사용 ( react-slick ) - by 1-blue */
  const width = innerWidth >= 500 ? 500 : innerWidth;

  return (
    <>
      <StyledPostUpload width={width}>
        <h1>게시글 생성</h1>

        <div>
          <span>이미지 등록</span>
          <FormToolkit.MultiPhotoInput setPhotos={setPhotos} />
        </div>

        <form onSubmit={onUploadPost}>
          <FormToolkit.Textarea
            id="문구 입력"
            placeholder="문구를 입력해주세요!"
            subText={errors.content?.message}
            {...register("content", {
              required: "문구를 입력해주세요!",
              maxLength: {
                value: 2000,
                message: "2,000자 이내로 입력해주세요!",
              },
            })}
          />

          <FormToolkit.Button>게시글 생성</FormToolkit.Button>
        </form>

        {/* 1. 사람 태그 */}
        {/* 2. 위치 */}
        {/* 3. 음악 */}
      </StyledPostUpload>

      {/* 아바타 업로드중 스피너 */}
      {isUploadPost && <Spinner.Page />}
    </>
  );
};

export default PostUpload;
