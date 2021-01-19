import Form from "../components/common/form";
import cardService from "../services/cardService";
import { toast } from "react-toastify";

class DeleteCard extends Form {
  state = {};
  async componentDidMount() {
    const cardId = this.props.match.params.id;
    let isConf = window.confirm("Are you sure you want to delete this card?");
    if (isConf) {
      await cardService.deleteCard(cardId);
      toast("You card has been deleted");
    }
    this.props.history.replace("/my-cards");
  }
  render() {
    return null;
  }
}

export default DeleteCard;
