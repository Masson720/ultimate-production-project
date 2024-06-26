import { useParams } from "react-router-dom";
import { Page } from "@/widgets/Page";

const ArticleEditPage = () => {
    const {id} = useParams<{id: string}>();
    const isEdit = Boolean(id);

    return (
        <Page>
            {isEdit ? 'Редактирование статьи с id ' + id : "Создание новой статьи"}
        </Page>
    )
}

export default ArticleEditPage;
