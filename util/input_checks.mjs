export class check {
    static not_null(input){
        let ans = false;
        if(!input){
            ans = false;
            return ans;
        }
        for(let letter of input.toString()){
            if(letter === " ")ans = false;
            else{
                ans = true;
                break;
            }
        }
        return ans;
    }

    static length(input, length_lower_limit = null,length_upper_limit = null){
        let  ans = false;
        if(length_lower_limit && input.length<length_lower_limit){
            ans = false;
            return ans;
        }
        else if(length_upper_limit && input.length > length_upper_limit){
            ans = false;
            return ans;
        }
        else {
            ans = true;
            return ans;
        }
    }

    static value_between(input, value_lower_limit = null, value_upper_limit = null){
        let  ans = false;
        if(value_lower_limit && input<value_lower_limit){
            ans = false;
            return ans;
        }
        else if(value_upper_limit && input > value_upper_limit){
            ans = false;
            return ans;
        }
        else {
            ans = true;
            return ans;
        }
    }

    static type(input, type){
        let ans = false;
        switch (type) {
            case "integer" : 
                if(Number(input)){
                    ans  = true;
                }
                break;
            default :
                ans = true;
        }
        return ans;
    }
}
