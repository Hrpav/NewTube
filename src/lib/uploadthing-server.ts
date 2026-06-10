import { UTApi, UTFile } from "uploadthing/server";

type RemoteUpload = {
  url: string;
  name: string;
};

export async function uploadRemoteFileAsServerFile({
  url,
  name,
}: RemoteUpload) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch remote file: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  const file = new UTFile([buffer], name, {
    type: response.headers.get("content-type") ?? undefined,
  });

  const utapi = new UTApi();

  return utapi.uploadFiles(file);
}
