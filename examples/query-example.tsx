import { SuspendIt } from "@porpoisetech/suspendit";

const query = () =>
  fetch("https://dog.ceo/api/breeds/image/random").then((response) =>
    response.json()
  );

export const QueryExample = () => {
  return (
    <SuspendIt query={query} fallback={<div>Finding a dog...</div>}>
      {({ data }) => (
        <div>
          <img src={data.message} />
        </div>
      )}
    </SuspendIt>
  );
};
