<?php

require_once('../tcpdf/config/lang/eng.php');
require_once('../tcpdf/tcpdf.php');
require_once("../dbConnection.php");

// extend TCPF with custom functions
class MYPDF extends TCPDF {

	// Load table data from file
	public function LoadData($file) {
		// Read file lines
		$lines = file($file);
		$data = array();
		foreach($lines as $line) {
			$data[] = explode(';', chop($line));
		}
		return $data;
	}
	//Color de Texto y las lineas
	public function Header(){
	
	/*Poner color al texto y las lineas*/
		$this->SetTextColor(0,0,0);
		$this->SetDrawColor(0,0,0);
		/* definicion de variables con titulo y subtitulo*/
		$titulo="TARJETA DE OPERACION DE TRANSPORTE";
		$subtitulo="AUTOMOTOR PUBLICO TERRESTRE";
		$this->SetY(50);
		$this->Cell(0, 5,$titulo,0,1,'C');
		$this->SetFont('helvetica', 'I', 7);
		$this->Cell(0, 5,$subtitulo, 0,1, 'C');
			

	}
		//Pie de Pagina
	public function Footer(){
//		/*Establecemos color de texto*/
		$this->SetTextColor(0,0,0);
//		/*insertamos numero de pagina y total depaginas*/
		$this->Cell(0, 10, 'Pag. '.$this->getAliasNumPage().
				   '-'.
				   $this->getAliasNbPages(),
				   0, false, 'C', 0, '', 0, false, 'T', 'M');
		$this->SetDrawColor(0,0,0);

	
	}
	// Colored table
	public function ColoredTable($header,$data) {

		$this->SetFillColor(210,210,210);
		$this->SetTextColor(10);
		$this->SetDrawColor(0,0,0);
		$this->SetLineWidth(0.3);
		$this->SetFont('helvetica', 'B',10);
		//$this->AddPage();
		// Header
		$w = array(10, 50, 50, 50, 50,50);
		$num_headers = count($header);
		for($i = 0; $i < $num_headers; ++$i) {
			$this->Cell($w[$i], 7, $header[$i], 1, 0, 'C', 1);
		}
		$this->Ln();
		// Color and font restoration
	
		$this->SetFillColor(224, 235, 255);
		$this->SetTextColor(0);
		$this->SetFont('');
		// Data
		$fill = 0;
		foreach($data as $row) {

			//$this->Cell($w[0], 6, $row['adminresolutionid'], 'LR', 0, 'C', $fill);
			//$this->Cell($w[1], 6, $row['adminresolutiondate'], 'LR', 0, 'C', $fill);
			//$this->Cell($w[2], 6, $row['adminresolutioncode'], 'LR', 0, 'C', $fill);
			//$this->Cell($w[3], 6, $row['adminresolutiontechnical'], 'LR', 0, 'C', $fill);
			//$this->Cell($w[4], 6, $row['adminresolutionlegal'], 'LR', 0, 'C', $fill);
			//$this->Cell($w[5], 6, $row['vehiclequantityid'], 'LR', 0, 'C', $fill);
			//$this->Ln();
			$fill=!$fill;
		}
		$this->Cell(array_sum($w), 0, '', 'T');
	}
}
/*$sql = "SELECT c.cardoperationid, c.cardoperationstatus, c.cardoperationvalidity, c.nameprincipal,
		 c.namesecretary, c.operatorregisterid, c.vehicleid, ";
		$sql .= "c.last_update, r.adminresolutionid, r.operatorregisterstate, ";
		$sql .= "v.vehiclebrand, v.vehiclestatus, v.vehiclemodel, v.vehiclelicense, v.picture,
		 v.vehiclecapacity, v.vehiclecategory, v.vehiclechasis, v.vehicleclass, ";
		$sql .= "p.propietaryfirstname, p.propietarylastname, p.propietaryci, o.syndicatename, 
		o.operatorstate, o.operatormatrix FROM  card_operation c ";
		$sql .= "inner join operator_register r on c.operatorregisterid = r.operatorregisterid inner join vehicle v on c.vehicleid = v.vehicleid ";
		$sql .="inner join propietary p on v.propietaryid = p.propietaryid inner join operator o on r.operatorid = o.operatorid
		WHERE c.operatorregisterid = 1 limit $limit offset $start";*/



$sql = "SELECT * FROM administrative_resolution LIMIT 0,100";
$result = array();
if ($resultdb = $mysqli->query($sql)) {

	while($record = $resultdb->fetch_assoc()) {

		array_push($result, $record);
	}	

	$resultdb->close();
}

// create new PDF document
$pdf = new MYPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// Informaci贸n referente al PDF
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Sistema Union');
$pdf->SetTitle('Sistema de Informacion del Transporte de Cochabamba(SINTRAC)');
$pdf->SetSubject('Reporte de Resoluciones Admministrativas');

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' >> '.date( 'd-M-Y' ).' // '.date( 'H:i:s' ),PDF_HEADER_STRING);
//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

//set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

//set some language-dependent strings
$pdf->setLanguageArray($l);

// ---------------------------------------------------------

$pdf->SetFont('helvetica', '', 6);

// add a page
$pdf->AddPage();
  // Codigo de Barra para el Foot
$pdf->SetBarcode(date("Y-m-d H:i:s", time()));
//Column titles
$header = array('ID', 'Fecha/Res.Administrativa', 'Cod/Res.Administratvia', 'Informe Tecnico', 'Informe Legal', 'Cantidad Autorizada');

// print colored table
$pdf->ColoredTable($header, $result);

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('res.administrativas_union.pdf', 'I');

//============================================================+
// END OF FILE                                                
//============================================================+