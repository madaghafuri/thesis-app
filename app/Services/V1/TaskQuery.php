<?php

namespace App\Services\V1;

use Illuminate\Http\Request;

class TaskQuery {
    protected $safeParams = [
        'name' => ['eq', 'like'],
        'dueDate' => ['eq', 'gt', 'lt'],
        'startDate' => ['eq', 'gt', 'lt'],
        'userId' => ['eq']
    ];

    protected $columnMap = [
        'startDate' => 'start_date',
        'dueDate' => 'due_date',
        'userId' => 'user_id',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
        'like' => 'like',
    ];

    public function transform(Request $request) {
        $eloQuery = [];

        foreach($this->safeParams as $param => $operators) {
            $query = $request->query($param);

            if (!isset($query)) {
                continue;
            }

            $column = $this->columnMap[$param] ?? $param;

            foreach($operators as $operator) {
                if (isset($query[$operator]) && $operator != 'like') {
                    $eloQuery[] = [$column, $this->operatorMap[$operator], $query[$operator]];
                } else if ($operator == 'like') {
                    $eloQuery[] = [$column, $this->operatorMap[$operator], "%$query[$operator]%"];
                }
            }
        }

        return $eloQuery;
    }
}