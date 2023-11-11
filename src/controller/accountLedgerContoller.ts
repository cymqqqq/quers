import { boe, ppe } from "../utils/config";
import { 
    accountBalance, 
    icp_query_newest_block_index, 
    query_block, 
    withdraw_icp 
} from "./accountController";

// balance context
export class LedgerController {
    public canister: any;
    public principal: any;
    public controller: any;
    public amount: any;
    public start_index: any;
    public block_length: any;

    public set_start_index(index: any) {
        this.start_index = index;
    }

    public set_block_length(block_length: any) {
        this.block_length = block_length;
    }

    public set_canister(canister: any) {
        this.canister = canister;
    }

    public set_principal(pid: any) {
        this.principal = pid;
    }

    public set_amount(amount: any) {
        this.amount = amount;
    }

    async build_account_balance_controller() {
        switch(this.canister) {
            case ppe.ledger:
                return await accountBalance(this.principal, this.canister);
      } 
   }

   async build_transfer_controller() {
        switch(this.canister) {
            case ppe.ledger:
                return await withdraw_icp(this.canister, this.principal, this.amount);
      }
   }

   async build_query_block_controller() {
        switch(this.canister) {
            case ppe.ledger:
                return await query_block(this.start_index)
     }
   }

   async build_scan_block_controller() {
        switch(this.canister) {
        }
   }

   async build_query_newest_block_controller() {
        switch(this.canister) {
            case ppe.ledger:
                return await icp_query_newest_block_index()
      }
   }
}