import { FC } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { Button } from "antd";
import { PageContent, PageHeader } from "@/components/PageComponents";
const GoodsDetail: FC = () => {
  const location = useLocation();
  const { id, name } = useParams();
  const [params] = useSearchParams();

  return (
    <>
      <PageHeader title="货物详情" backPath="/admin/goods/list">
        <Button>申请</Button>
        <Button>拒绝</Button>
        <Button>作废</Button>
      </PageHeader>
      <PageContent>
        <h3>GoodsDetail</h3>
        <h4>id:{id}</h4>
        <h4>name:{name}</h4>
        <h4>urlParams:{params.toString()}</h4>
        <div>{JSON.stringify(location)}</div>
      </PageContent>
    </>
  );
};

export default GoodsDetail;
