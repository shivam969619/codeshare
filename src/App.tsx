import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Editor } from "./Editor";

export default function App() {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_uIQD5_2uwxQljYvkphaPpldwMnseE4oV3xNfOiZoGCtlcSeB1i3DZ4dzL2suGBhr"
      }
    >
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <Editor />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
